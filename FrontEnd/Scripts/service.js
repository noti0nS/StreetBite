class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Content-Type': 'application/json'
        };

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Métodos específicos para cada entidade
    async getClientes() {
        return this.request('/api/v1/clientes');
    }

    async getClienteById(id) {
        return this.request(`/api/v1/clientes/${id}`);
    }

    async createCliente(data) {
        return this.request('/api/v1/clientes', 'POST', data);
    }

    async updateCliente(id, data) {
        return this.request(`/api/v1/clientes/${id}`, 'PATCH', data);
    }

    async deleteCliente(id) {
        return this.request(`/api/v1/clientes/${id}`, 'DELETE');
    }

    async getComandas() {
        return this.request('/api/v1/comandas');
    }

    async getComandaById(id) {
        return this.request(`/api/v1/comandas/${id}`);
    }

    async createComanda() {
        return this.request('/api/v1/comandas', 'POST');
    }

    async updateComanda(id, data) {
        return this.request(`/api/v1/comandas/${id}`, 'PATCH', data);
    }

    async deleteComanda(id) {
        return this.request(`/api/v1/comandas/${id}`, 'DELETE');
    }

    async addItemComanda(data) {
        return this.request(`/api/v1/comandas/itens`, 'POST', data);
    }

    async getEnderecos() {
        return this.request('/api/v1/enderecos');
    }

    async getEnderecoById(id) {
        return this.request(`/api/v1/enderecos/${id}`);
    }

    async createEndereco(data) {
        return this.request('/api/v1/enderecos', 'POST', data);
    }

    async updateEndereco(id, data) {
        return this.request(`/api/v1/enderecos/${id}`, 'PATCH', data);
    }

    async deleteEndereco(id) {
        return this.request(`/api/v1/enderecos/${id}`, 'DELETE');
    }

    async getProdutos() {
        return this.request('/api/v1/produtos');
    }

    async getProdutoById(id) {
        return this.request(`/api/v1/produtos/${id}`);
    }

    async createProduto(data) {
        return this.request('/api/v1/produtos', 'POST', data);
    }

    async updateProduto(id, data) {
        return this.request(`/api/v1/produtos/${id}`, 'PATCH', data);
    }

    async deleteProduto(id) {
        return this.request(`/api/v1/produtos/${id}`, 'DELETE');
    }
}

// Exemplo de uso:
// const api = new ApiService('http://localhost:8080');
// api.getClientes().then(clientes => console.log(clientes));

export default ApiService;
