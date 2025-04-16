import express from "express";
import { requestCloudFunc } from "../lib/requestCloudFunc";
import { ActiveResponse, CreateResponse, TokenResponse, User, UserResponse } from "types/user";

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/getOrgMember", async function (req, res) {
  const { org_member_id, org_code } = req.query;
  if (!org_member_id || !org_code) {
    res.send("缺少参数");
    return;
  }
  try {
    const data = await requestCloudFunc<UserResponse>({
      key: "QOrgMember",
      org_member_id,
      org_code,
    });

    if (data.data && data.data[0].member_id) {
      const user = await requestCloudFunc<TokenResponse>({
        key: "encrypt",
        member_id: data.data[0].member_id,
      });
      res.send({
        ...user,
        data:{...user.data,
        org_code: org_code,
        org_member_id: org_member_id,
        member_id: data.data[0].member_id,
        }
      });
      return;
    } else {
      const user = await requestCloudFunc<CreateResponse>({
        key: "CUOrgMember",
        org_member_id,
        org_code,
      });
      const token = await requestCloudFunc<TokenResponse>({
        key: "encrypt",
        member_id: user.data.member_id,
      });
      res.send({
        ...token,
        data:{...token.data,org_code: org_code,
        org_member_id: org_member_id,
        member_id: user.data.member_id},
      });
      return;
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/activationCodeToSN", async function (req, res) {
  const {
    code, // 邀请码
    email,
    username,
    member_id,
    token, // 登录时的token
  } = req.body;
  if (!member_id || !code || !email || !username || !token) {
    res.send("缺少参数");
    return;
  }
  try {
  const data = await requestCloudFunc<ActiveResponse>({
    key: "activationCodeToSN",
    code, // 邀请码
    email,
    username,
    member_id,
    token,
  });

  res.send({
    code: data.code,
    status: data.status,
    data: {
      member_id: data.data.member_id,
      created_at: data.data.created_at,
      end_at: data.data.end_at,
    },
  });

} catch (error) {
  res.send(error);
}
});
export default router;
