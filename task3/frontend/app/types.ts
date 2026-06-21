export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

export type TodoFilter = "all" | "active" | "completed";

export type RawSearchParams = Record<string, string | string[] | undefined>;
