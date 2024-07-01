# Record Management in Angular

This project is a record management system built using Angular on the frontend and Node.js on the backend. It allows users to manage and display records using sampledata.json as the data source.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- Angular CLI

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the command `npm install`.
4. Start the backend server by running `node server.js`.
5. In a separate terminal, navigate to the `frontend` directory.
6. Install the frontend dependencies by running `npm install`.
7. Start the Angular development server by running `ng serve`.
8. Open your browser and navigate to `http://localhost:4200` to access the application.

## Features

- Display records from the sampledata.json file.
- Add new records.
- Edit existing records.
- Delete records.

## File Structure

```
├── backend
│   ├── server.js
│   └── sampledata.json
└── frontend
   ├── src
   │   ├── app
   │   │   ├── components
   │   │   │   ├── record-list
   │   │   │   │   ├── record-list.component.ts
   │   │   │   │   └── record-list.component.html
   │   │   │   ├── record-form
   │   │   │   │   ├── record-form.component.ts
   │   │   │   │   └── record-form.component.html
   │   │   │   └── ...
   │   │   ├── services
   │   │   │   └── record.service.ts
   │   │   └── ...
   │   ├── assets
   │   └── ...
   └── ...
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
