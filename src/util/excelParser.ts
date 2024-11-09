import xlsx from "xlsx";
import path from "path";
import fs from "fs";

/**
 * Parse Excel file and extract data from specified columns
 */
const parseExcel = (file: any, columnHeaders: any[]) => {
	try {
		// Read the file
		const filePath = path.resolve(file.path);
		const workbook = xlsx.readFile(filePath);
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];

		const sheetData = xlsx.utils.sheet_to_json(sheet);

		let extractedData: any[] = [];

		sheetData.forEach((row: any) => {
			let rowData: any = {};

			columnHeaders.forEach((header: any) => {
				rowData[header] = row[header] || null;
			});

			extractedData.push(rowData);
		});

		fs.unlinkSync(filePath);

		return extractedData;
	} catch (error) {
		throw new Error("Error parsing Excel file: " + error.message);
	}
};

export { parseExcel };
