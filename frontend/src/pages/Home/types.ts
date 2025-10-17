import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type BrandFeature = {
  title: string;
  description: string;
  icon: IconDefinition;
};

// type CategoryItem = {
//   id: string;
//   name: string;
//   icon: React.ForwardRefExoticComponent<
//     Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
//   >;
// };

// export type CategoryItemsProps = CategoryItem[];
