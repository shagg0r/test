import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  Box,
  ClickAwayListener,
  Grow,
  Icon,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

function pointInTriangle(
  x: number,
  y: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
) {
  function sign(
    px: number,
    py: number,
    qx: number,
    qy: number,
    rx: number,
    ry: number,
  ) {
    return (px - rx) * (qy - ry) - (qx - rx) * (py - ry);
  }

  const b1 = sign(x, y, x1, y1, x2, y2) <= 0;
  const b2 = sign(x, y, x2, y2, x3, y3) <= 0;
  const b3 = sign(x, y, x3, y3, x1, y1) <= 0;

  return b1 === b2 && b2 === b3;
}

type SubMenuProps = {
  MENU_LEVELS: number;
  options: Array<{
    value: string;
    menuLevel: number;
    nestedOptions?: SubMenuProps['options'];
  }>;
};

function SubMenu({ options, MENU_LEVELS }: SubMenuProps) {
  const [anchors, setAnchors] = React.useState<{
    elements: Array<null | HTMLElement>;
    options: Array<null | typeof options>;
  }>({
    elements: new Array(MENU_LEVELS).fill(null),
    options: new Array(MENU_LEVELS).fill(null),
  });

  const mouseEntered = React.useRef<Record<string, boolean>>({});

  const virtualTriangleCoordinates = React.useRef<{
    mouseLeftCordinates: Array<number>;
    subMenuCorrdinates: Array<number>;
  }>({
    mouseLeftCordinates: [],
    subMenuCorrdinates: [],
  });

  const handleOpen = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    level = 0,
    nestedOptions = options,
  ) => {
    const target = event.target as HTMLElement;

    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index === level ? target : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index === level ? nestedOptions : element,
      ),
    }));
  };

  const handleClose = (level: number) => {
    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index >= level ? null : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index >= level ? null : element,
      ),
    }));
  };

  const buttonRef = React.useRef(null);
  const mouseEnteredTime = React.useRef(0);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const left = React.useRef(false);

  const getId = (option: (typeof options)[0], index: number) => {
    return `${index}-${option.menuLevel}`;
  };

  return (
    <React.Fragment>
      <Button
        ref={buttonRef}
        onClick={(event) => {
          handleOpen(event);
        }}
      >
        Menu
      </Button>

      {anchors.elements.map((anchorElement, index) =>
        anchorElement ? (
          <Popper
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            key={`${anchorElement.innerText} menu`}
            role={undefined}
            placement={index > 0 ? 'right-start' : 'bottom-start'}
            transition
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: 'left top',
                }}
              >
                <Paper>
                  <ClickAwayListener
                    onClickAway={(e) => {
                      if (e.target === buttonRef.current) {
                        handleClose(0);
                        return;
                      }

                      const optionWithoutSubMenu = anchors.elements.every(
                        (element) => !e.composedPath().includes(element!),
                      );

                      if (optionWithoutSubMenu) {
                        handleClose(0);
                      }
                    }}
                  >
                    <MenuList
                      autoFocusItem={Boolean(anchorElement)}
                      id={`nested-menu-${index}`}
                      aria-labelledby="nested-button"
                    >
                      {(anchors.options[index] ?? []).map((option, optIndex) => (
                        <MenuItem
                          key={option.value}
                          aria-haspopup={!!option.nestedOptions ?? undefined}
                          aria-expanded={
                            option.nestedOptions
                              ? anchors.elements.some(
                                  (element) => element?.innerText === option.value,
                                )
                              : undefined
                          }
                          onClick={() => {
                            if (!option.nestedOptions) {
                              handleClose(0);
                            }
                          }}
                          onMouseEnter={() => {
                            mouseEnteredTime.current = Date.now();
                          }}
                          onMouseMove={(event) => {
                            let shouldComputeSubMenuOpenLogic = true;
                            const submenu = document.querySelector(
                              `#nested-menu-${option.menuLevel + 1}`,
                            );

                            function computeSubMenuLogic(check?: string) {
                              if (check) {
                                console.log('check', 186);
                              }
                              if (!mouseEntered.current[getId(option, optIndex)]) {
                                if (check) {
                                  console.log('check', 190);
                                }
                                mouseEntered.current[getId(option, optIndex)] = true;
                                // if mouse moved from option which has submenu to current option which doesn't have submenu, then all submenu should be closed
                                if (!option.nestedOptions) {
                                  if (check) {
                                    console.log('check', 196);
                                  }
                                  handleClose(option.menuLevel + 1);
                                } else if (
                                  // if mouse moved from option which has submenu to current option which have submenu, then open current option submenu and close previous option submenu
                                  option.nestedOptions &&
                                  anchors.options[option.menuLevel + 1] &&
                                  !option.nestedOptions.every(
                                    (val, i) =>
                                      val.value ===
                                      anchors.options[option.menuLevel + 1]?.[i]
                                        .value,
                                  )
                                ) {
                                  if (check) {
                                    console.log(
                                      'check',
                                      event,
                                      option.menuLevel + 1,
                                      option.nestedOptions,
                                    );
                                  }
                                  handleClose(option.menuLevel + 1);
                                  handleOpen(
                                    event,
                                    option.menuLevel + 1,
                                    option.nestedOptions,
                                  );
                                } else {
                                  if (check) {
                                    console.log('check', 221);
                                  }
                                  handleOpen(
                                    event,
                                    option.menuLevel + 1,
                                    option.nestedOptions,
                                  );
                                }
                              }
                            }

                            if (
                              virtualTriangleCoordinates.current.mouseLeftCordinates
                                .length > 0 &&
                              submenu
                            ) {
                              const { x, y, height } =
                                submenu.getBoundingClientRect();

                              const [x1, y1] = [
                                {
                                  x,
                                  y,
                                },
                                {
                                  x,
                                  y: y + height,
                                },
                              ];

                              if (
                                pointInTriangle(
                                  event.clientX,
                                  -event.clientY,
                                  x1.x,

                                  -x1.y,

                                  y1.x,
                                  -y1.y,

                                  virtualTriangleCoordinates.current
                                    .mouseLeftCordinates[0],
                                  -virtualTriangleCoordinates.current
                                    .mouseLeftCordinates[1],
                                )
                              ) {
                                shouldComputeSubMenuOpenLogic = false;

                                if (timer.current) {
                                  clearTimeout(timer.current);
                                }
                                timer.current = setTimeout(() => {
                                  // alert(event.currentTarget);
                                  computeSubMenuLogic('po');
                                }, 25);
                              } else {
                                shouldComputeSubMenuOpenLogic = true;
                              }
                            }

                            if (shouldComputeSubMenuOpenLogic) {
                              if (timer.current) {
                                clearTimeout(timer.current);
                              }
                              computeSubMenuLogic();
                            }
                          }}
                          onMouseLeave={(event) => {
                            virtualTriangleCoordinates.current.mouseLeftCordinates =
                              [event.clientX, event.clientY];

                            if (timer.current) {
                              clearInterval(timer.current);
                            }
                            mouseEntered.current[getId(option, optIndex)] = false;
                          }}
                          onKeyDown={(event) => {
                            if (option.nestedOptions) {
                              if (
                                event.key === 'ArrowRight' ||
                                event.key === 'Enter'
                              ) {
                                handleOpen(
                                  event,
                                  option.menuLevel + 1,
                                  option.nestedOptions,
                                );
                              }
                            }
                            if (event.key === 'ArrowLeft' && option.menuLevel > 0) {
                              handleClose(option.menuLevel);
                              anchors.elements[option.menuLevel]?.focus();
                            }

                            if (event.key === 'Escape') {
                              handleClose(0);
                            }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <Typography>{option.value}</Typography>
                            {option.nestedOptions ? (
                              <Icon>chevron_right</Icon>
                            ) : null}
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null,
      )}
    </React.Fragment>
  );
}
export default function NestedMenu() {
  const options = [
    {
      value: 'Food',
      menuLevel: 0,
    },
    {
      value: 'Drinks',
      menuLevel: 0,
      nestedOptions: [
        {
          value: 'Non-Alcoholic',
          menuLevel: 1,
          nestedOptions: [
            {
              value: 'Soda',
              menuLevel: 2,
            },
            {
              value: 'Iced Tea',
              menuLevel: 2,
            },
            {
              value: 'Lemonade',
              menuLevel: 2,
            },
            {
              value: 'Mocktail',
              menuLevel: 2,
            },
            {
              value: 'Smoothie',
              menuLevel: 2,
            },
            {
              value: 'Herbal tea',
              menuLevel: 2,
            },
          ],
        },
        {
          value: 'Alcoholic',
          menuLevel: 1,
        },
      ],
    },

    {
      value: 'Desserts',
      menuLevel: 0,
      nestedOptions: [
        {
          value: 'Cakes',
          menuLevel: 1,
        },
        {
          value: 'Ice Cream',
          menuLevel: 1,
        },
        {
          value: 'Pastries',
          menuLevel: 1,
        },
      ],
    },
  ];

  return <SubMenu options={options} MENU_LEVELS={3} />;
}
