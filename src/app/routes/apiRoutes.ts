export const apiRoutes = {
    registerUser: "/auth/create-user",
    verifyOtp: "/auth/verify-email",
    login: "/auth/login",
    getAllUsers: "/auth/users",
    getAllQuestionSet: "/question-sets",
    getAllCategories:"/categories",
    createQuestionSet: "/question-sets/create",
    getQuestionSetById: "/question-sets/:id",
    deleteQuestionSet:"/question-sets/:id",
    updateQuestionSet:"/question-sets/:id",
    deactivateQuestionSet:"/question-sets/:id"
}