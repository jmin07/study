# ✨ Node.js
본 내용은 Node.js 를 공부하고 정리한 레포지토리 입니다.
> 프론트  
  : SSR(Server Side Rendering) 방식으로 Pug를 사용해서 프론트를 구성했습니다.

## 📂 Folder Structure

#### 회원가입(Sign up)
사이트를 사용하기 위해 회원가입하는 유저의 정보를 저장하는 방법에 대해 작성했습니다.  

#### 로그인(Login/Sign in)
기본 로그인 방식(Cookie, Session)부터 최신(?) JWT 등으로 로그인을 하고 조금 더 쉽게 작성할 수 있도록 패키지 사용까지 작성해 보았습니다.  

##### [기본 로그인]
  1. [cookie](https://www.npmjs.com/package/cookie-parser)  
    - **세션 쿠키(Session Cookie)**는 현재 세션이 끝날 때 삭제됩니다. 브라우저는 "현재 세션"이 끝나는 시점을 정의하며, 어떤 브라우저들은 재시작할 때 세션을 복원해 세션 쿠키가 무기한 존재할 수 있도록 합니다.  
    - **영속적인 쿠키(Permanent cookie)**는 Expires 속성에 명시된 날짜에 삭제되거나, Max-Age 속성에 명시된 기간 이후에 삭제됩니다.  
  2. [session](https://www.npmjs.com/package/express-session)
      - 쿠키와 달리 웹서버에 데이터들이 객체 형식으로 저장된다.
  3. JWT

##### [기본 로그인 + DB 연동]
  1. mysql
  2. MongoDB
    
##### [로그인 with 패키지]
  1. [passport](https://www.npmjs.com/package/passport)
      - 구글, 네이버, 카카오, 페이스북의 API 를 사용하여 로그인할 수 있다.
 

### 로그인 이메일 전송
**작성 예정**


### Log 처리
**작성 예정**

## 📂 참고사항
[function](https://stackoverflow.com/questions/43951067/what-is-the-meaning-of-the-module-exports-functionapp)  
: This line means this file has been exported as a **function**,  
: you can access it by require('test.js')  

```javascript
module.exports = function()
```

404 Error  
: In Express, 404 responses are not the result of an error, so the error-handler middleware will not capture them  
: 404는 에러의 결과가 아닌 등록 되지 않은 경로로 요청이 들어왔을 때 처리이다.  

```javascript
app.use(function(req, res, next){
  res.send(404).send('Sorry cant find that');
})
```

500 Error  
: 서버에서 처리하지 못하는 에러가 발생하는 경우로,  
: 오류 처리 미들웨어는 app.use() 및 라우트 호출을 정의한 후 마지막으로 정의해야한다.  

```javascript
app.use(function(err, req, res, next){
  res.status(500).send('Something broke!');
})
```
