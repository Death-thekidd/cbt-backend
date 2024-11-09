import { User, Examstudent, Exam } from "../database/models";
import { Identifier, Op, col } from "sequelize";
import { parseExcel } from "../util/excelParser";

const addStudents = async (data: any) => {
	const { examId, file } = data;
	try {
		const exam = await Exam.findByPk(examId);
		if (!exam) throw new Error("Exam not found");
		const students = [];
		const invalidMatricNos = [];
		const studentRows = parseExcel(file, ["Matric No"]); // Assuming parseExcel function reads the Matric No column

		for (const studentRow of studentRows) {
			const matricNo = studentRow["Matric No"];
			const student = await User.findOne({ where: { idNumber: matricNo } });
			if (!student) {
				invalidMatricNos.push(matricNo);
				continue;
			}
			// await Examstudent.create({ examId, studentId: student.id });
			students.push(student);
		}
		await exam.addStudents(students);
		return { students, invalidMatricNos };
	} catch (error) {
		throw error;
	}
};

const addStudents2 = async (data: any) => {
	const { examId, students } = data; // Expecting `students` to be an array of objects with matric numbers
	const addedStudents = [];
	const invalidMatricNos = [];

	try {
		const exam = await Exam.findByPk(examId);
		if (!exam) throw new Error("Exam not found");
		for (const studentObj of students) {
			const matricNo = studentObj.matricNo;
			const student = await User.findOne({ where: { idNumber: matricNo } });

			if (!student) {
				invalidMatricNos.push(matricNo);
				continue;
			}

			// await Examstudent.create({ examId, studentId: student.id });
			addedStudents.push(student);
		}

		await exam.addStudents(addedStudents);

		return { addedStudents, invalidMatricNos };
	} catch (error) {
		throw error;
	}
};

const removeStudent = async (data: any) => {
	const { examId, studentId } = data;
	try {
		const exam = await Exam.findByPk(examId);
		const student = await User.findByPk(studentId);
		if (!exam || !student) throw new Error("Exam or Student not found");

		await exam.removeStudent(student);

		const updatedStudents = await exam.getStudents({ joinTableAttributes: [] });

		return updatedStudents;
	} catch (error) {
		throw error;
	}
};

const getAddedStudents = async (examId: Identifier) => {
	try {
		const exam = await Exam.findByPk(examId);
		return await exam.getStudents({ joinTableAttributes: [] });
	} catch (error) {
		throw error;
	}
};

export default { addStudents, addStudents2, removeStudent, getAddedStudents };
