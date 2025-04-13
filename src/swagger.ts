export default {
  swagger: "2.0",
  info: {
    title: "用户操作 API",
    version: "1.0.0",
  },      // 域名（可含端口）
  basePath: "/user",

  paths: {
    "/getOrgMember": {
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

                    member_id: {
                      type: "string",
                      description: "成员 ID",
                    },
                    token: {
                      type: "string",
                      description: "登录 token",
                    }

                  },
                },
              },
            },
            description: "Successful response with member data",
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
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  description: "HTTP 状态码，例如 200 表示成功",
                },
                data: {
                  type: "object",
                  properties: {

                    member_id: {
                      type: "string",
                      description: "成员 ID",
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

                  },

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
