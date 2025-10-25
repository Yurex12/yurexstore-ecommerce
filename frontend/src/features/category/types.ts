export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Categories = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
};
