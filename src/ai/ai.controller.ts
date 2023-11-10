import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AIService } from "./ai.service";
import {
  CreateQuestionByPromptDto,
  CreateQuestionByTextFileDto,
} from "./ai.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("/api/v1/ai")
@ApiTags("AI")
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post("exam/prompt-generate")
  @HttpCode(200)
  @ApiOperation({ summary: "Tạo đề thi bằng chủ đề " })
  @ApiResponse({
    status: 201,
    description: "Success",
    schema: {},
  })
  async createByPrompt(
    @Body() createQuestionByPromptDto: CreateQuestionByPromptDto
  ) {
    return this.aiService.createByPrompt(createQuestionByPromptDto);
  }

  @Post("exam/text-generate")
  @HttpCode(200)
  @ApiOperation({ summary: "Tạo đề thi bằng text " })
  @ApiResponse({
    status: 201,
    description: "Success",
    schema: {},
  })
  async createByText(
    @Body()
    createQuestionByTextFileDto: CreateQuestionByTextFileDto
  ) {
    return this.aiService.createByTextFile(createQuestionByTextFileDto);
  }
}
