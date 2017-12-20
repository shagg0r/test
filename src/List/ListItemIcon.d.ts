import { StandardProps } from '../MuiProps';

export interface ListItemIconProps extends StandardProps<{}, ListItemIconClassKey> {}

export type ListItemIconClassKey = 'root';

declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
