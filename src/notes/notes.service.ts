import { Injectable, HttpException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewNote({ userId, title, text }: CreateNoteDto): Promise<{ message: string }> {
    const note = await this.prismaService.note.create({
      data: {
        userId,
        title,
        text
      }
    })

    if (note) {
      return { message: `New note ${note.title} created` }
    } else {
      throw new HttpException('Invalid note data received', 400);
    }
  }

  async getAllNotes(): Promise<Note[]> {
    const notes = await this.prismaService.note.findMany({})

    if (!notes.length) {
      throw new HttpException('No notes found', 400);
    }

    return notes
  }

  async getNote(id: string): Promise<Note> {
    const note = await this.prismaService.note.findUnique({
      where: {
        id
      }
    })

    if (!note) {
      throw new HttpException('Note not found', 400)
    }

    return note
  }

  async updateNote(id: string, { userId, title, text, completed }: UpdateNoteDto): Promise<{ message: string }> {
    const note = await this.prismaService.note.findUnique({
      where: {
        id
      }
    })

    if (!note) {
      throw new HttpException('Note not found', 400);
    }

    const updatedNote = await this.prismaService.note.update({
      where: {
        id
      },
      data: {
        userId,
        title,
        text,
        completed
      }
    })

    return { message: `${updatedNote.title} updated` }
  }

  async deleteNote(id: string): Promise<{ message: string }> {
    const note = await this.prismaService.note.findUnique({
      where: {
        id
      }
    })

    if (!note) {
      throw new HttpException('Note not found', 400);
    }

    const result = await this.prismaService.note.delete({
      where: {
        id
      }
    })

    return { message: `Note ${result.title} with ID #${result.noteId} deleted` }
  }
}
