
import typeScriptIcon from '../../../../images/blogs/icons/typescript.svg';
import typeScriptBanner from '../../../../images/blogs/banners/typescript-blog-banner.png';

import dddIcon from '../../../../images/blogs/icons/ddd.svg';
import dddBanner from '../../../../images/blogs/banners/ddd-blog-banner.png';

import mysteryIcon from '../../../../images/icons/mystery-icon.svg'
import mysteryBanner from '../../../../images/blogs/banners/misc-banner.png';

import graphQLIcon from '../../../../images/blogs/icons/graphql.svg';
import graphQLBanner from '../../../../images/blogs/banners/graphql-banner.png';

export const BlogCategoryType = {
  'TypeScript': {
    icon: typeScriptIcon,
    banner: typeScriptBanner
  },
  'Domain-Driven Design': {
    icon: dddIcon,
    banner: dddBanner
  },
  'GraphQL': {
    icon: graphQLIcon,
    banner: graphQLBanner
  },
  Fallback: {
    icon: mysteryIcon,
    banner: mysteryBanner
  }
}