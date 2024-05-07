export type Category = {
  id: number;
  name: string;
  description?: string;
  headId: number | null;
};

export type HierarchicalCategory = Category & {
  subCategories: HierarchicalCategory[];
};
