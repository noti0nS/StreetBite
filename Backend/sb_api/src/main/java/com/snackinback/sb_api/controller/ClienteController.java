package com.snackinback.sb_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snackinback.sb_api.model.Cliente;
import com.snackinback.sb_api.model.dto.ClienteResponseDto;
import com.snackinback.sb_api.service.ClienteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    public void adicionarCliente(@RequestBody Cliente request){
        clienteService.addCliente(request);
    }
    @GetMapping
    public List<Cliente> listarClientes(){
        return clienteService.listarTodosOsClientes();
    }
    @GetMapping("/{id}")
    public ClienteResponseDto getClienteById(@PathVariable Long id){
        return clienteService.getClienteById(id);
    }
    @PatchMapping("/{id}")
    public void updateCliente(@PathVariable Long id,@RequestBody Cliente request){
        clienteService.updateCliente(id, request);
    }
    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable Long id){
        clienteService.deleteCliente(id);
    }
    
}
