# DataScienceToolkit

This project is a FMI project which is for the discipline Web.

## Install dependencies

Run `npm install` in order to install all needed dependencies.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Usage

### Create account

Firstly you will be redirected to /auth and you will have to sign-in in your account or sign-up if you
don't have one.

### Use the functionalities

- After successful sign-in/up you will be redirected to /home.
- There you can upload a JSON file by clicking on or dropping file in "Drop JSON here! or Click here to select JSON!" box.
- After that you will have to click the "Upload" button.
- The uploaded file/files will be displayed in Uploaded "JSON files" box.
- From there you can select the file you wish to analyse or delete.
  - If you want to analyse a file:
    - Click on the "Analyse" button.
    - You will be presented with variance, median and histogram of your data.
    - You will have the opportunity to build pie OR line chart from your data.
  - If you want to delete a file:
    - Click on "Delete selected file" button.
    - Confirm your choice.
