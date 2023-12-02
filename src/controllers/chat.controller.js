
class ChatController {
    async redirecChat() {
        try {
            res.render('chat');
        } catch (error) {
            res.status(500).json({ error: "Hubo un error al acceder al listado" });
        }
    }
}

export const chatController = new ChatController();