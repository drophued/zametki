from flask import Flask, request, jsonify
from flask_cors import CORS  # Импортируем CORS для разрешения кросс-доменных запросов
import json
import os

app = Flask(__name__)
CORS(app)  # Включаем CORS для всего приложения

# Путь к JSON-файлу для хранения заметок
NOTES_FILE = 'notes.json'

# Функция для загрузки заметок из файла
def load_notes():
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, 'r', encoding='utf-8') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []  # Если файл пустой или поврежден, возвращаем пустой список
    return []

# Функция для сохранения заметок в файл
def save_notes(notes):
    with open(NOTES_FILE, 'w', encoding='utf-8') as file:
        json.dump(notes, file, ensure_ascii=False, indent=4)

# Загружаем заметки при запуске сервера
notes = load_notes()

# Маршрут для получения всех заметок (GET)
@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

# Маршрут для добавления новой заметки (POST)
@app.route('/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    if not data or 'id' not in data or 'note' not in data or 'date' not in data:
        return jsonify({'error': 'Invalid data'}), 400

    # Проверяем, существует ли заметка с таким же ID
    existing_note = next((note for note in notes if note['id'] == data['id']), None)
    if existing_note:
        # Обновляем существующую заметку
        existing_note.update(data)
    else:
        # Добавляем новую заметку
        notes.append(data)

    # Сохраняем изменения в файл
    save_notes(notes)
    return jsonify({'message': 'Note saved successfully'}), 200

# Запуск сервера
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)  # Указываем хост и порт