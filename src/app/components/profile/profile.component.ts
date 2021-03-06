import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from './../../services/notes.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  notes = [];
  token;
  decoded;
  currentNoteId;
  constructor(private _NotesService: NotesService, private _Router: Router) {

    try {
      this.token = localStorage.getItem("TOKEN");
      this.decoded = jwt_decode(this.token);
      this.getAllNotes();
    } catch (error) {
      localStorage.clear()
      this._Router.navigate(['/signin'])
    }

  }

  addNoteForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(2)])
  })

  editedNote = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(2)])
  })

  getAllNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id
    }
    this._NotesService.getAllNotes(data).subscribe((response) => {
      if (response.message === 'success')
        this.notes = response.Notes;
    })
  }

  addNoteData() {
    let noteData = {
      title: this.addNoteForm.value.title,
      desc: this.addNoteForm.value.desc,
      token: this.token,
      citizenID: this.decoded._id
    }
    this._NotesService.addNote(noteData).subscribe((response) => {
      if (response.message === "success") {
        this.getAllNotes();
        $("#addNote").modal('hide')
      }
      this.getAllNotes();
      this.addNoteForm.reset();
    })
  }

  getNoteId(id) {
    this.currentNoteId = id
  }

  deletNote() {
    let deletedNote = {
      token: this.token,
      NoteID: this.currentNoteId
    }
    this._NotesService.deletNote(deletedNote).subscribe((response) => {
      if (response.message === "deleted") {
        $("#deleteNote").modal('hide')
        this.getAllNotes();
        console.log(this.notes);
      }
    })
  }

  setValue() {
    for (let index = 0; index < this.notes.length; index++) {

      if (this.notes[index]._id == this.currentNoteId) {

        console.log(this.notes[index]._id);
        console.log(this.editedNote.controls);

        this.editedNote.controls.title.setValue(this.notes[index].title);
        this.editedNote.controls.desc.setValue(this.notes[index].desc);
      }
    }
  }
  editNote() {
    let updatedData = {
      title: this.editedNote.value.title,
      desc: this.editedNote.value.desc,
      NoteID: this.currentNoteId,
      token: this.token,
    }
    this._NotesService.updatNote(updatedData).subscribe((response) => {
      if (response.message === "updated") {
        this.getAllNotes();
        $("#editNote").modal('hide')
      }
    })
  }
  ngOnInit(): void {
  }
}
