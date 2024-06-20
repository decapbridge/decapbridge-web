/* eslint-disable react/display-name */
import { forwardRef, useCallback } from "react";
import { usePageContext } from "vike-react/usePageContext";
import type { PossibleLinks } from "/src/utils/types";
import navigate from "/src/utils/navigate";

const isAlteredClick = (ev: React.MouseEvent) =>
  ev.shiftKey || ev.altKey || ev.metaKey || ev.ctrlKey;

const isLeftClick = (ev: React.MouseEvent) => ev.buttons === 1;

interface InternalLinkProps {
  href: PossibleLinks;
  className?: string;
  children: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = forwardRef<
  HTMLAnchorElement,
  InternalLinkProps
>(({ href, ...rest }, ref) => {
  const { urlPathname } = usePageContext();
  const isActive = urlPathname === href;

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    async (ev) => {
      if (!isAlteredClick(ev) && isActive) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [isActive]
  );

  const handleMouseDown = useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >(
    async (ev) => {
      if (!isAlteredClick(ev) && isLeftClick(ev) && !isActive) {
        await navigate(href);
      }
    },
    [href, isActive]
  );

  const fastClickProps: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> = {}
  if (href.startsWith('/')) {
    fastClickProps.onClick = handleClick
    fastClickProps.onMouseDown = handleMouseDown
  }

  return (
    <a
      ref={ref}
      {...rest}
      {...fastClickProps}
      href={href}
      aria-current={isActive}
    />
  );
});

export default InternalLink;
