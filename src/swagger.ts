export default {
  swagger: "2.0",
  info: {
    title: "用户操作 API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://openapi.dawenxi.art/user",
    },
  ],
  paths: {
    "/getQOrgMember": {
      get: {
        summary: "Get organization member details",
        description: "Fetch organization member details using org_member_id and org_code.",
        parameters: [
          {
            name: "org_member_id",
            in: "query",
            required: true,
            type: "string",
            description: "The ID of the organization member",
          },
          {
            name: "org_code",
            in: "query",
            required: true,
            type: "string",
            description: "The organization code",
          },
        ],
        responses: {
          "200": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                  description: "状态码，例如 0 表示成功",
                },
                code: {
                  type: "integer",
                  description: "HTTP 状态码，例如 200 表示成功",
                },
                data: {
                  type: "object",
                  properties: {
                    org_code: {
                      type: "string",
                      description: "组织代码",
                    },
                    org_member_id: {
                      type: "string",
                      description: "组织成员 ID",
                    },
                    tcbContext: {
                      type: "object",
                      description: "上下文信息（目前为空对象）",
                      additionalProperties: true,
                    },
                    userInfo: {
                      type: "object",
                      properties: {
                        appId: {
                          type: "string",
                          description: "应用程序 ID",
                        },
                      },
                      required: ["appId"],
                    },
                    member_id: {
                      type: "string",
                      description: "成员 ID",
                    },
                    created_at: {
                      type: "integer",
                      format: "int64",
                      description: "创建时间（时间戳）",
                    },
                    complete_learning: {
                      type: "array",
                      items: {
                        type: "object", // 或者根据具体内容定义更详细的类型
                      },
                      description: "已完成的学习列表（目前为空数组）",
                    },
                  },
                  required: [
                    "org_code",
                    "org_member_id",
                    "userInfo",
                    "member_id",
                    "created_at",
                    "complete_learning",
                  ],
                },
              },
            },
            description: "Successful response with member data",
          },
          "400": {
            description: "Missing parameters",
          },
        },
      },
    },
    "/createQOrgMember": {
      post: {
        summary: "Create a new organization member",
        description: "Create a new organization member using org_member_id and org_code.",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                org_member_id: {
                  type: "string",
                  description: "The ID of the organization member",
                },
                org_code: {
                  type: "string",
                  description: "The organization code",
                },
              },
              required: ["org_member_id", "org_code"],
            },
          },
        ],
        responses: {
          "200": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                  description: "状态码，例如 0 表示成功",
                },
                code: {
                  type: "integer",
                  description: "HTTP 状态码，例如 200 表示成功",
                },
                data: {
                  type: "object",
                  properties: {
                    org_code: {
                      type: "string",
                      description: "组织代码",
                    },
                    org_member_id: {
                      type: "string",
                      description: "组织成员 ID",
                    },
                    tcbContext: {
                      type: "object",
                      description: "上下文信息（目前为空对象）",
                      additionalProperties: true,
                    },
                    userInfo: {
                      type: "object",
                      properties: {
                        appId: {
                          type: "string",
                          description: "应用程序 ID",
                        },
                      },
                      required: ["appId"],
                    },
                    member_id: {
                      type: "string",
                      description: "成员 ID",
                    },
                    created_at: {
                      type: "integer",
                      format: "int64",
                      description: "创建时间（时间戳）",
                    },
                    complete_learning: {
                      type: "array",
                      items: {
                        type: "object", // 或者根据具体内容定义更详细的类型
                      },
                      description: "已完成的学习列表（目前为空数组）",
                    },
                  },
                  required: [
                    "org_code",
                    "org_member_id",
                    "userInfo",
                    "member_id",
                    "created_at",
                    "complete_learning",
                  ],
                },
              },
            },
            description: "Successful response with creation data",
          },
          "400": {
            description: "Missing parameters",
          },
        },
      },
    },
    "/loginByMemberId": {
      post: {
        summary: "Login by member ID",
        description: "Login or authenticate using a member ID.",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                member_id: {
                  type: "string",
                  description: "The ID of the member",
                },
              },
              required: ["member_id"],
            },
          },
        ],
        responses: {
          "200": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "integer",
                  description: "状态码，例如 0 表示成功",
                },
                code: {
                  type: "integer",
                  description: "HTTP 状态码，例如 200 表示成功",
                },
                data: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "登录令牌",
                    },
                  },
                  required: ["member_id", "token"],
                },
              },
            },
            description: "Successful response with login data",
          },
          "400": {
            description: "Missing parameters",
          },
        },
      },
    },
    "/activationCodeToSN": {
      post: {
        summary: "Activate member using activation code",
        description:
          "Activate a member using an activation code, email, username, member ID, and token.",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  description: "The activation code",
                },
                email: {
                  type: "string",
                  description: "The email of the member",
                },
                username: {
                  type: "string",
                  description: "The username of the member",
                },
                member_id: {
                  type: "string",
                  description: "The ID of the member",
                },
                token: {
                  type: "string",
                  description: "The login token",
                },
              },
              required: ["code", "email", "username", "member_id", "token"],
            },
          },
        ],
        responses: {
          "200": {
            scheme: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  description: "HTTP 状态码，例如 200 表示成功",
                },
                data: {
                  type: "object",
                  properties: {
                    license: {
                      type: "string",
                      description: "许可证密钥",
                    },
                    member_id: {
                      type: "string",
                      description: "成员 ID",
                    },
                    username: {
                      type: "string",
                      description: "用户名",
                    },
                    role: {
                      type: "array",
                      items: {
                        type: "integer",
                      },
                      description: "用户角色列表，使用整数表示",
                    },
                    generationby: {
                      type: "string",
                      description: "生成者标识",
                    },
                    generation_type: {
                      type: "string",
                      description: "生成类型，例如 'code'",
                    },
                    created_at: {
                      type: "integer",
                      format: "int64",
                      description: "创建时间（时间戳）",
                    },
                    end_at: {
                      type: "integer",
                      format: "int64",
                      description: "结束时间（时间戳）",
                    },
                    update_at: {
                      type: "integer",
                      format: "int64",
                      description: "更新时间（时间戳）",
                    },
                  },
                  required: [
                    "license",
                    "member_id",
                    "username",
                    "role",
                    "generationby",
                    "generation_type",
                    "created_at",
                    "end_at",
                    "update_at",
                  ],
                },
              },
              required: ["code", "data"],
            },
            description: "Successful response with activation data",
          },
          "400": {
            description: "Missing parameters",
          },
        },
      },
    },
  },
};
