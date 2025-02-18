import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { LoginDto, RegisterDto } from "@src/auth/dto";
import { PrismaService } from "@src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AppModule } from "../src/app.module";
import { EditProfileDto } from "@src/profiles/dto";

describe('NestJs tutorial end-to-end testing', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    );

    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3334")
  });

  afterAll(async () => {
    await prisma.cleanDb();
    app.close();
  });



  describe("Authentication", () => {
    describe("Register", () => {
      const registerDto: RegisterDto = {
        email: "janedoe@email.com",
        password: "IAmAStringORNumber123!",
        confirmPassword: "IAmAStringORNumber123!"
      }
      it("Should not register a user with no body", () => {
        return pactum.spec().post('/auth/register').withBody({}).expectStatus(400);
      });
      it("Should not register a user with an invalid email", () => {
        return pactum.spec().post('/auth/register').withBody({
          ...registerDto,
          email: "invalidemail"
        }).expectStatus(400);
      });
      it("Should not register a user with a weak or no password", () => {
        return pactum.spec().post('/auth/register').withBody({
          ...registerDto,
          password: ""
        }).expectStatus(400);
      });
      it("Should not register a user if password and confirm password do not match", () => {
        return pactum.spec().post('/auth/register').withBody({
          ...registerDto,
          confirmPassword: "IAmAStringORNumber123!123"
        }).expectStatus(400);
      });
      it("Should register a new user", () => {
        return pactum.spec().post('/auth/register').withBody(registerDto).expectStatus(201).withRequestTimeout(10000);
      }, 10000);
      it("Should not register a user with an existing email", () => {
        return pactum.spec().post('/auth/register').withBody(registerDto).expectStatus(403);
      });
    });

    describe("Login", () => {
      const loginDto: LoginDto = {
        email: "janedoe@email.com",
        password: "IAmAStringORNumber123!",
      };

      it("Should not login with an invalid email", () => {
        return pactum.spec().post('/auth/login').withBody({
          ...loginDto,
          email:"invalidemail"
        }).expectStatus(400);
      });
      it("Should not login with an invalid password", () => {
        return pactum.spec().post('/auth/login').withBody({
          ...loginDto,
          password:"notvalid"
        }).expectStatus(400);
      });
      it("Should login with valid credentials", () => {
        return pactum.spec().post('/auth/login').withBody(loginDto).expectStatus(200).stores('user_access_token', 'access_token');
      });
    })
  });


  describe("Roles", () => {
    it.todo("Should get all roles");
    it.todo("Should get a role by id");
    it.todo("Should update a role");
    it.todo("Should delete a role");
  });

  describe("Profiles", () => {
    const editProfileDto: EditProfileDto = {
      bio:"I am a bio",
      image:"https://example.com/image.jpg"
    }

    it("Should not get the current user's profile without a token", () => {
      return pactum.spec().get('/profile').expectStatus(401);
    })

    it("Should get the current user's profile", () => {
      return pactum.spec().get('/profile').withHeaders({
        Authorization: `Bearer $S{user_access_token}`
      }).expectStatus(200);
    });

    it("Should not update the current user's profile without a token", () => {
      return pactum.spec().patch('/profile').withBody(editProfileDto).expectStatus(401);
    });

    it("Should update the current user's profile", () => {
      return pactum.spec().patch('/profile').withBody(editProfileDto).withHeaders({
        Authorization: `Bearer $S{user_access_token}`
      }).expectStatus(200);
    });
  });

  describe("Users", () => {
    it.todo("Should get all users");
    it.todo("Should get a user by id");
    it.todo("Should update a user");
    it("Should throw an error if the unauthenticated user tries to delete an account", () => {
      return pactum.spec().delete('/user').withHeaders({}).expectStatus(401);
    });

    it("Should delete the current user if authenticated", () => {
      return pactum.spec().delete('/users').withHeaders({
        Authorization : `Bearer $S{user_access_token}`
      }).expectStatus(200);
    })
  });
})