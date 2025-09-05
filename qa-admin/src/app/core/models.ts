export interface Permission { id: string; name: string; }
export interface Role { id: string; name: string; permissionIds: string[]; }
export interface User { id: string; name: string; email: string; roleIds: string[]; }

export interface TestStep {
  keyword: string;
  elementType: string;
  webElement: string;
  elementValue: string;
  skip: boolean;
  description: string;
  screenshot: boolean;
}

export interface TestCase { id: string; name: string; steps: TestStep[]; }
export interface TestSuite { id: string; name: string; caseIds: string[]; }

