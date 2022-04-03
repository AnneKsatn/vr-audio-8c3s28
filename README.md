# vr-audio-8c3s28

Чтобы проверить передачу аудио от клиента к серверу запусти код https://github.com/harryheman/Blog-Posts/tree/master/audio-record
Сервер будет работать на порту 3000

Перед этим не забудь:
1. Установить node
2. npm i -g corepack
3. Создать папку uploads в Blog-Posts\audio-record



Сделай еще раз npm install!
149 строчка - адрес для изображения  await fetch('http://localhost:5000/save_image'


код открытия изображения:

@app.route('/save_image', methods=['post'])
def save_image():

    files = request.files
    file = files.get('file')

    print(file)

    im = Image.open(file) 
    im.show()

    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
