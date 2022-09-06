import { rest } from "msw";

//handlers 변수 안에 어떤 리퀘스트를 모킹할 건지 정의.
// 두번째 인자로 핸들러 작성해서 넘기면 됨.

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  // Handles a GET /user request
  rest.get("/user", null),
];
