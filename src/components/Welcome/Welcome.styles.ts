import { createStyles, rem } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
  },

  title: {
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
  },

  description: {
    fontSize: rem(24),
    marginTop: theme.spacing.xl,
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
  },

  control: {
    height: rem(53),
    paddingInline: rem(37),
  },
}));
