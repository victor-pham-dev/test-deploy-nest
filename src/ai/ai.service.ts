import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  CreateQuestionByPromptDto,
  CreateQuestionByTextFileDto,
} from "./ai.dto";

import { OpenAIService } from "services/openAI.service";
@Injectable()
export class AIService extends OpenAIService {
  //CREATE QUESTION BY PROMPT
  async createByPrompt(data: CreateQuestionByPromptDto) {
    const { quantity, content, answer_per_question, question_type } = data;
    const convertPromt = `Tạo cho tôi ${quantity} câu hỏi trắc nghiệm về chủ đề ${content}, mỗi câu hỏi có ${answer_per_question} đáp án và mỗi câu hỏi có ${question_type} đáp án đúng, và kí tự "*" vào trước đáp án đúng.`;

    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: convertPromt }],
      });

      return {
        message: "Tạo câu hỏi thành công",
        data: chatCompletion,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ?? "Internal Server",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //CREATE QUESTION BY PROMPT
  async createByTextFile(data: CreateQuestionByTextFileDto) {
    const { quantity, content, answer_per_question, question_type } = data;
    const convertPromt = `Tôi có đoạn văn bản:\n\n ${content}  \n\n Từ đoạn văn bản trên hãy tạo cho tôi ${quantity} câu hỏi trắc nghiệm , mỗi câu hỏi có ${answer_per_question} đáp án và mỗi câu hỏi có ${question_type} đáp án đúng, và kí tự "*" vào trước đáp án đúng.`;

    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: convertPromt }],
      });

      return {
        message: "Tạo câu hỏi thành công",
        data: chatCompletion,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ?? "Internal Server",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
