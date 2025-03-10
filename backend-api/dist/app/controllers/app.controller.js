import { appService } from '../../assembly';
import { sendSuccessApiResponse } from '../helpers/apiResponse';
export function getWelcome(req, res) {
    const welcomeMessage = appService.getWelcomeMessage();
    return sendSuccessApiResponse(res, { message: welcomeMessage });
}
//# sourceMappingURL=app.controller.js.map