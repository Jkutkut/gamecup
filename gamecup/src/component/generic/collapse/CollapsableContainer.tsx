import { PropsWithChildren, useState } from "react";

interface Props {
  title: string;
  defaultCollapsed?: boolean;
}

const CollapsableContainer = ({ title, defaultCollapsed = false, children }: PropsWithChildren<Props>) => {
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
  
  let classes = 'collapsable-title';
  if (collapsed)
    classes += ' open';
  return <>
    <h3 className={classes} onClick={() => {setCollapsed(!collapsed)}}
    >
      {title}
    </h3>
    <div className={collapsed ? 'collapse' : ''}>
      {children}
    </div>
  </>;
}

export default CollapsableContainer;