/* eslint-disable no-console */
// inspire by reacts dangerfile
// danger has to be the first thing required!
const { danger, markdown } = require('danger');
const { exec } = require('child_process');
const { loadComparison } = require('./scripts/sizeSnapshot');

const parsedSizeChangeThreshold = 300;
const gzipSizeChangeThreshold = 100;

/**
 * executes a git subcommand
 * @param {any} args
 */
function git(args) {
  return new Promise((resolve, reject) => {
    exec(`git ${args}`, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

const upstreamRemote = 'danger-upstream';

async function cleanup() {
  await git(`remote remove ${upstreamRemote}`);
}

/**
 * creates a callback for Object.entries(comparison).filter that excludes every
 * entry that does not exceed the given threshold values for parsed and gzip size
 *
 * @param {number} parsedThreshold
 * @param {number} gzipThreshold
 */
function createComparisonFilter(parsedThreshold, gzipThreshold) {
  return ([, { parsed, gzip }]) => {
    return (
      Math.abs(parsed.absoluteDiff) >= parsedThreshold ||
      Math.abs(gzip.absoluteDiff) >= gzipThreshold
    );
  };
}

/**
 * checks if the bundle is of a package e.b. `@material-ui/core` but not
 * `@material-ui/core/Paper`
 * @param {[string]} comparison entry
 */
function isPackageComparison([bundle]) {
  return /^@[\w-]+\/[\w-]+$/.test(bundle);
}

/**
 * Generates a user-readable string from a percentage change
 * @param {number} change
 * @param {string} goodEmoji emoji on reduction
 * @param {string} badEmooji emoji on increase
 */
function addPercent(change, goodEmoji = '', badEmooji = ':small_red_triangle_down:') {
  const formatted = (change * 100).toFixed(2);
  if (/^-|^0(?:\.0+)$/.test(formatted)) {
    return `${formatted}%${goodEmoji}`;
  }
  return `+${formatted}%${badEmooji}`;
}

/**
 * Generates a Markdown table
 * @param {string[]} headers
 * @param {string[][]} body
 * @returns {string}
 */
function generateMDTable(headers, body) {
  const tableHeaders = [headers.join(' | '), headers.map(() => ' --- ').join(' | ')];

  const tablebody = body.map(r => r.join(' | '));
  return `${tableHeaders.join('\n')}\n${tablebody.join('\n')}`;
}

function generateEmphasizedChange([bundle, { parsed, gzip }]) {
  // increase might be a bug fix which is a nice thing. reductions are always nice
  const changeParsed = addPercent(parsed.relativeDiff, ':heart_eyes:', '');
  const changeGzip = addPercent(gzip.relativeDiff, ':heart_eyes:', '');

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

async function run() {
  // Use git locally to grab the commit which represents the place
  // where the branches differ
  const upstreamRepo = danger.github.pr.base.repo.full_name;
  const upstreamRef = danger.github.pr.base.ref;
  try {
    await git(`remote add ${upstreamRemote} https://github.com/${upstreamRepo}.git`);
  } catch (err) {
    // ignore if it already exist for local testing
  }
  await git(`fetch ${upstreamRemote}`);
  const mergeBaseCommit = await git(`merge-base HEAD ${upstreamRemote}/${upstreamRef}`);

  const commitRange = `${mergeBaseCommit}...${danger.github.pr.head.sha}`;

  const comparison = await loadComparison(mergeBaseCommit, upstreamRef);
  const results = Object.entries(comparison.bundles);
  const anyResultsChanges = results.filter(createComparisonFilter(1, 1));

  if (anyResultsChanges.length > 0) {
    markdown('This PR introduced some changes to the bundle size.');

    const importantChanges = results
      .filter(createComparisonFilter(parsedSizeChangeThreshold, gzipSizeChangeThreshold))
      .filter(isPackageComparison)
      .map(generateEmphasizedChange);

    // have to guard against empty strings
    if (importantChanges.length > 0) {
      markdown(importantChanges.join('\n'));
    }

    const detailsTable = generateMDTable(
      [
        'bundle',
        'parsed diff',
        'gzip diff',
        'prev parsed',
        'current parsed',
        'prev gzip',
        'current gzip',
      ],
      results.map(([bundle, { parsed, gzip }]) => {
        return [
          bundle,
          addPercent(parsed.relativeDiff),
          addPercent(gzip.relativeDiff),
          parsed.previous,
          parsed.current,
          gzip.previous,
          gzip.current,
        ];
      }),
    );

    const details = `
  <details>
  <summary>Details of bundle changes.</summary>

  <p>Comparing: ${commitRange}</p>

  ${detailsTable}

  </details>`;

    markdown(details);
  } else {
    // this can later be removed to reduce PR noise. It is kept for now for debug
    // purposes only. DangerJS will swallow console.logs if completes successfully
    markdown(`No bundle size changes comparing ${commitRange}`);
  }
}

(async () => {
  try {
    await run();
  } catch (err) {
    console.error(err);
    // need to cleanup first so no early exit
  }

  try {
    await cleanup();
  } catch (err) {
    console.error(err);
    // unhandled promise rejects exit with 0
    process.exit(1);
  }
})();
