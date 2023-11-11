from flask import Flask, render_template, request, redirect, session, url_for

app = Flask(__name__)
app.secret_key = 'abnet'

# Rota para o formulário inicial
# Mantenha a rota '/' para o formulário inicial
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        building_name = request.form.get('building_name')
        tower = request.form.get('tower')
        level = request.form.get('level')
        qts_drops = request.form.get('qts_drops')
        qts_drops = int(qts_drops)

        # Armazene os dados na sessão
        session['building_name'] = building_name
        session['tower'] = tower
        session['level'] = level
        session['qts_drops'] = qts_drops

        # Redirecione para a página 'fibers'
        return redirect(url_for('fibers', building_name=building_name, tower=tower, level=level, qts_drops=qts_drops))

    return render_template('index.html')

# Crie a rota para a página 'fibers'
# Crie a rota para a página 'fibers'
@app.route('/fibers', methods=['GET', 'POST'])
def fibers():
    # Verifique se os dados necessários estão na sessão
    if 'building_name' not in session or 'tower' not in session or 'level' not in session or 'qts_drops' not in session:
        # Se não estiverem, redirecione de volta para '/'
        return redirect(url_for('index'))

    # Obtenha os dados da sessão
    building_name = session.get('building_name')
    tower = session.get('tower')
    level = session.get('level')
    qts_drops = session.get('qts_drops')

    # Faça o processamento necessário
    qts_drops = int(qts_drops)
    qts_tubes = (qts_drops + 11) // 12  # Calcula a quantidade de tubos arredondando para cima

    # Armazene os dados atualizados na sessão
    session['qts_tubes'] = qts_tubes

    # Renderize a página 'fibers' com os dados atualizados
    return render_template('fibers.html', qts_tubes=qts_tubes, building_name=building_name, tower=tower, level=level)


# Passo 1: Crie uma nova rota para a página de resumo
@app.route('/summary', methods=['GET', 'POST'])
def summary():
    # Passo 2: Colete os dados do index e fibers usando session
    building_name = session.get('building_name')
    tower = session.get('tower')
    level = session.get('level')
    qts_drops = session.get('qts_drops')
    qts_tubes = session.get('qts_tubes')
    
    # Colete os dados das fibras de acordo com o nome dos campos de entrada gerados em fibers.html
    fibers_data = {}
    for key, value in request.form.items():
        if key.startswith('tube_'):
            parts = key.split('_')
            tube_number = parts[1]
            fiber_number = parts[3]
            fibers_data.setdefault(tube_number, {})[fiber_number] = value

    # Passo 3: Renderize um modelo HTML com os dados coletados
    return render_template('summary.html', building_name=building_name, tower=tower, level=level, qts_drops=qts_drops, qts_tubes=qts_tubes, fibers_data=fibers_data)
if __name__ == '__main__':
    app.run(debug=True)
