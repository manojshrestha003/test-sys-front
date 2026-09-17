
export interface QuestionSet {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  accessDurationDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionSetsApiResponse {
  success: boolean;
  message: string;
  data: {
    questionSets: QuestionSet[];
  };
}

export interface CreateQuestionSetPayload {
  categoryId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  accessDurationDays: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesApiResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}

export type FormattedQuestionSet ={
  id: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  currency: string;
  accessDurationDays: number;
  status: "active" | "inactive";
};

export interface  questionSetSubmit {
   categoryId: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    accessDurationDays: number;
}