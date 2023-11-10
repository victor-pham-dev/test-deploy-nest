import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionByPromptDto {
  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly answer_per_question: string;

  @ApiProperty()
  readonly question_type: string | number;

  @ApiProperty()
  readonly content: string;
}

export class CreateQuestionByTextFileDto {
  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly answer_per_question: string;

  @ApiProperty()
  readonly question_type: string | number;

  @ApiProperty()
  readonly content: string;
}
