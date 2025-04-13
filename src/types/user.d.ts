interface AdditionalProp {
  [key: string]: any;
}

interface TcbContext {
  additionalProp1: AdditionalProp;
}

interface UserInfo {
  appId: string;
}

interface CompleteLearningItem {
  [key: string]: any;
}
interface User {

    org_code: string;
    org_member_id: string;
    tcbContext: TcbContext;
    userInfo: UserInfo;
    member_id: string;
    created_at: number;
    complete_learning: CompleteLearningItem[];

}
export interface UserResponse {
  status: number;
  code: number;
  data: User[];
}

export interface CreateResponse {
  status: number;
  code: number;
  data: User;
}
export interface TokenResponse {
  status: number;
  code: number;
  data: {
    token: string;
  };
}

export interface ActiveResponse {
  status: number;
  code: number;
  data: {
    license: string;
    member_id: string;
    username: string;
    role: number[]; // Array of numbers (e.g., [0, 1, 2])
    generationby: string;
    generation_type: string;
    created_at: number; // Assuming Unix timestamp (e.g., 1634567890)
    end_at: number; // Assuming Unix timestamp
    update_at: number; // Assuming Unix timestamp
  };
}
