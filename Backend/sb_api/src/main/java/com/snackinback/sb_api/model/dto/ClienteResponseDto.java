package com.snackinback.sb_api.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponseDto {
    Integer clienteId;
    String nome;
    Integer telefone;
    
    List<EnderecoResponseDto> enderecos;
    public ClienteResponseDto(String nome, Integer telefone, List<EnderecoResponseDto> enderecos) {
        this.nome = nome;
        this.telefone = telefone;
        this.enderecos = enderecos;
    }
    
}
