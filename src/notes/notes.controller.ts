import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // @desc Create New Note
  // @route POST /notes
  // @access Private
  @Post()
  createNewNote(@Body() createNoteDto: CreateNoteDto): Promise<{ message: string }> {
    return this.notesService.createNewNote(createNoteDto);
  }

  // @desc getAllNotes
  // @route GET /notes
  // @access Private
  @Get()
  getAllNotes(): Promise<Note[]> {
    return this.notesService.getAllNotes();
  }

  // @desc getNote
  // @route GET /notes/:id
  // @access Private
  @Get(':id')
  getNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.getNote(id);
  }

  // @desc updateNote
  // @route PATCH /notes/:id
  // @access Private
  @Patch(':id')
  updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<{ message: string }> {
    return this.notesService.updateNote(id, updateNoteDto);
  }

  // @desc deleteNote
  // @route DELETE /notes/:id
  // @access Private
  @Delete(':id')
  deleteNote(@Param('id') id: string): Promise<{ message: string }> {
    return this.notesService.deleteNote(id);
  }
}
