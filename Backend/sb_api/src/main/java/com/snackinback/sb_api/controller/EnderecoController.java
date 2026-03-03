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

import com.snackinback.sb_api.model.Endereco;
import com.snackinback.sb_api.model.dto.EnderecoResponseDto;
import com.snackinback.sb_api.service.EnderecoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/enderecos")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoService enderecoService;

    @PostMapping
    public void adicionarEndereco(@RequestBody EnderecoResponseDto request){
        enderecoService.addEndereco(request);
    }
    @GetMapping
    public List<Endereco> listarEnderecos(){
        return enderecoService.listarTodosOsEnderecos();
    }
    @GetMapping("/{id}")
    public Endereco getEnderecoById(@PathVariable Long id){
        return enderecoService.getEnderecoById(id);
    }
    @PatchMapping("/{id}")
    public void updateEndereco(@PathVariable Long id,@RequestBody Endereco request){
        enderecoService.updateEndereco(id, request);
    }
    @DeleteMapping("/{id}")
    public void deleteEndereco (@PathVariable Long id){
        enderecoService.deleteEndereco(id);
    }
    
}

