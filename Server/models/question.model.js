import generate from './generic.model.js';
import db from '../utils/db.js';

let questionModel = generate('question', 'id');

questionModel.findAllQuestionsByQuizId = async function(quizId){
    const rows = await db('question').where('quiz_id', quizId);
    if (rows.length === 0) {
        return null;
    }

    return rows;
}

export default questionModel;