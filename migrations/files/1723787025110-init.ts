import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723787025110 implements MigrationInterface {
    name = 'Init1723787025110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_profile_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "address" character varying(100), "first_name" character varying(50), "last_name" character varying(50), "gender" "public"."user_profile_gender_enum" NOT NULL DEFAULT 'male', "place_of_birth" character varying(50), "date_of_birth" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "PK_eee360f3bff24af1b6890765201" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_gender_enum"`);
    }

}
