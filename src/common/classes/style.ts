import { getTheme, mergeStyleSets, FontWeights} from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/styling';

const theme = getTheme();
export const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.xLarge,
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px'
    }
  ]});

 export const iconButtonStyles = mergeStyleSets({
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px'
    },
    rootHovered: {
      color: theme.palette.neutralDark
    }
  });
  