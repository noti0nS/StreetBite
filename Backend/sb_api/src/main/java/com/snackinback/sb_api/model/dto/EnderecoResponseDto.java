package com.snackinback.sb_api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoResponseDto {
    Integer clienteId;
    Integer cep;
    String nomeDaRua;
    Integer numeroDaCasa;
    public EnderecoResponseDto(Integer clienteId, String nomeDaRua) {
        this.clienteId = clienteId;
        this.nomeDaRua = nomeDaRua;
    }
}

