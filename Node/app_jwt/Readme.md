# ✨ app_session_passport_mysql

## Folder Structure
mysql Session 테이블에 저장되는 session 은 기간이 만료되면 알아서 삭제가 된다.  

```
Routes
    authRoute -> authProvider -> authController -> auth
``` 

### [JWT](https://pronist.dev/143)  
토큰(Token) 기반 인증이다. 토큰은 세선과 달리 클라이언트에 저장되기 때문에 **클라이언트**에 저장된다.  
토큰 자체에 사용자의 권한 정보나 서비스를 사용하기 위한 정보가 포함되어있다.  

#### Process
1. 클라이언트 웹서버스 인증.
2. 서버에 서 서명된(Signed) JWT 를 생성하여 클라이언트에 응답
3. 클라이언트가 JWT를 HTTP Header에 첨부
4. 서버는 받은 JWT 를 검증

#### Structure  
Header, Payload, Signature 로 구성되어 있다.  
Header 에는 JWT에서 사용할 타입과 해시 알고리즘의 종류가 담겨 있다.  
Payload 는 서버에 접속한 사용자 권한 정보와 데이터 등이 있다.


### Reference
1. [인증타입](https://velog.io/@cada/%ED%86%A0%EA%B7%BC-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D%EC%97%90%EC%84%9C-bearer%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)
2.


### 
Access Token 은 **res.json** 으로 보내고 Refresh Token 은 **res.cookie** 로 전송한다.



https://stackoverflow.com/questions/68755473/mysql-workbench-add-timestamp-fields