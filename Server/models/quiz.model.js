import generate from './generic.model.js';
import db from '../utils/db.js';

let quizModel = generate('quiz', 'id');

// find quizs with UserID
quizModel.findAllQuizsByUserId = async function(userId){
    const rows = await db('quiz').where('user_id', userId);
    if (rows.length === 0) {
        return null;
    }
    return rows;
}

export default quizModel;