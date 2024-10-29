export type Task = {
  id?: Record;
  task: string;
  order: number;
  name: string;
  checked: boolean;
};


type Record = {
  id: {
    String: string
  },
  tb: string
}