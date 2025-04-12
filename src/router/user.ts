import express from "express";
import { requestCloudFunc } from "../lib/requestCloudFunc";

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
router.get("/getQOrgMember", async function (req, res) {
  const {org_member_id,org_code} =req.query;
  if (!org_member_id || !org_code) {
    res.send("缺少参数");
  }
  const data = await requestCloudFunc({key:'QOrgMember', org_member_id,org_code});

  res.send(data);
});


router.post("/createQOrgMember", async function (req, res) {
  console.log(req.body);
  const {org_member_id,org_code} =req.body;
  if (!org_member_id || !org_code) {
    res.send("缺少参数");
  }
  const data = await requestCloudFunc({key:'CUOrgMember', org_member_id,org_code});

  res.send(data);
});

router.post("/loginByMemberId", async function (req, res) {
  const {member_id} =req.body;
  if (!member_id ) {
    res.send("缺少参数");
  }
  const data = await requestCloudFunc({key:'encrypt', member_id});

  res.send(data);
});

router.post("/activationCodeToSN", async function (req, res) {
  const {code,// 邀请码
    email,
    username,
    member_id,
    token// 登录时的token
    } =req.body;
  if (!member_id || !code || !email || !username || !token ) {
    res.send("缺少参数");
  }
  const data = await requestCloudFunc({key:'activationCodeToSN', code,// 邀请码
    email,
    username,
    member_id,
    token});

  res.send(data);
});
export default router;
