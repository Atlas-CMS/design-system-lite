import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { Typography, TypographyProps } from '../Typography';

interface BaseHeaderLayoutProps extends TypographyProps {
  navigationAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  centeredAction?: React.ReactNode;
  primaryAction?: React.ReactNode;
  subtitle?: React.ReactNode;
  sticky?: boolean;
  width?: number;
}

interface HeaderLayoutProps extends BaseHeaderLayoutProps {}

export const HeaderLayout = (props: HeaderLayoutProps) => {
  const baseHeaderLayoutRef = useRef<HTMLDivElement>(null);
  const [headerSize, setHeaderSize] = useState<DOMRect | null>(null);

  const [containerRef, isVisible] = useElementOnScreen<HTMLDivElement>({
    rootMargin: '0px',
    threshold: 0,
    root: null,
  });

  useResizeObserver(containerRef, () => {
    if (containerRef.current) {
      setHeaderSize(containerRef.current.getBoundingClientRect());
    }
  });

  useEffect(() => {
    if (baseHeaderLayoutRef.current) {
      setHeaderSize(baseHeaderLayoutRef.current.getBoundingClientRect());
    }
  }, [baseHeaderLayoutRef]);

  return (
    <>
      <div className="atlas-HeaderLayout-placeholderContainer" ref={containerRef}>
        <div style={{ height: headerSize?.height }} className="atlas-HeaderLAyout-placeholder" />
      </div>
      <BaseHeaderLayout {...props} sticky width={headerSize?.width} ref={baseHeaderLayoutRef} />
    </>
  );
};

HeaderLayout.displayName = 'HeaderLayout';

const StickyBox = styled(Box).attrs({
  className: 'atlas-HeaderLayout-sticky',
})<{ width?: number }>`
  width: ${({ width }) => (width ? `${width / 16}rem` : undefined)};
  z-index: ${({ theme }) => theme.zIndices[1]};
`;

const AtlasTypographyBox = styled(Box).attrs({
  className: 'atlas-HeaderLayout-typography',
})`
  min-width: 0;
`;

const AtlasNavActionBox = styled(Box).attrs({
  className: 'atlas-HeaderLayout-navigationAction',
})`
  min-width: 0;
`;

const AtlasSecondaryActionBox = styled(Box).attrs({
  className: 'atlas-HeaderLayout-secondaryAction',
})`
  min-width: 0;
`;

const AtlasPrimaryActionBox = styled(Box).attrs({
  className: 'atlas-HeaderLayout-primaryAction',
})`
  min-width: 0;
`;

export const BaseHeaderLayout = React.forwardRef<HTMLDivElement, BaseHeaderLayoutProps>(
  (
    { navigationAction, primaryAction, centeredAction, secondaryAction, subtitle, title, sticky, width, ...props },
    ref,
  ) => {
    const isSubtitleString = typeof subtitle === 'string';

    return (
      <StickyBox
        data-strapi-header-sticky
        paddingBottom={3}
        paddingRight={6}
        paddingLeft={6}
        paddingTop={3}
        right={0}
        top={0}
        background="neutral0"
        shadow="tableShadow"
        position="fixed"
        width={width}
        zIndex={10}
      >
        <Flex justifyContent="space-between">
          <Flex>
            {navigationAction && <AtlasNavActionBox paddingRight={3}>{navigationAction}</AtlasNavActionBox>}
            <AtlasTypographyBox>
              <Typography variant="beta" as="h1" {...props}>
                {title}
              </Typography>
              {isSubtitleString ? (
                <Typography variant="pi" textColor="neutral600">
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              )}
            </AtlasTypographyBox>
            {secondaryAction ? (
              <AtlasSecondaryActionBox paddingLeft={4}>{secondaryAction}</AtlasSecondaryActionBox>
            ) : null}
          </Flex>
          {centeredAction && <Flex>{centeredAction}</Flex>}
          <Flex>
            {primaryAction ? <AtlasPrimaryActionBox paddingLeft={2}>{primaryAction}</AtlasPrimaryActionBox> : undefined}
          </Flex>
        </Flex>
      </StickyBox>
    );

    // return (
    //   <Box
    //     ref={ref}
    //     paddingLeft={10}
    //     paddingRight={10}
    //     paddingBottom={8}
    //     paddingTop={navigationAction ? 6 : 8}
    //     background="neutral100"
    //     data-strapi-header
    //   >
    //     {navigationAction ? <Box paddingBottom={2}>{navigationAction}</Box> : null}
    //     <Flex justifyContent="space-between">
    //       <Flex minWidth={0}>
    //         <Typography as="h1" variant="alpha" {...props}>
    //           {title}
    //         </Typography>
    //         {secondaryAction ? <Box paddingLeft={4}>{secondaryAction}</Box> : null}
    //       </Flex>
    //       {primaryAction}
    //     </Flex>
    //     {isSubtitleString ? (
    //       <Typography variant="epsilon" textColor="neutral600" as="p">
    //         {subtitle}
    //       </Typography>
    //     ) : (
    //       subtitle
    //     )}
    //   </Box>
    // );
  },
);
