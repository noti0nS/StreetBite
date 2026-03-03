package com.snackinback.sb_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.snackinback.sb_api.model.Cliente;
import com.snackinback.sb_api.model.Endereco;
import com.snackinback.sb_api.model.dto.EnderecoResponseDto;
import com.snackinback.sb_api.repository.ClienteRepository;
import com.snackinback.sb_api.repository.EnderecoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final ClienteRepository clienteRepository;

    public void addEndereco(EnderecoResponseDto request){
        Cliente cliente = clienteRepository.findById(Long.parseLong(Integer.toString(request.getClienteId())))
            .orElseThrow(
                () -> new RuntimeException("Cliente não encontrado")
                );
        Endereco endereco = new Endereco();
         endereco.setCliente(cliente);
         endereco.setCep(request.getCep());
         endereco.setNomeDaRua(request.getNomeDaRua());
         endereco.setNumeroDaCasa(request.getNumeroDaCasa());
         cliente.getEndereco().add(endereco);
        clienteRepository.save(cliente);
    }

     public Endereco getEnderecoById(Long id){
        
        if (id==null) throw new RuntimeException("ID inválido.");
        Endereco endereco = enderecoRepository.findById(id)
         .orElseThrow(
                () -> new RuntimeException("Endereço não encontrado.")
                );
        return endereco;
                
    }

    public List<Endereco> listarTodosOsEnderecos(){
        return enderecoRepository.findAll();
    }

    public void updateEndereco(Long id, Endereco update){
        if(id == null)throw new RuntimeException("ID inválido.");
        
            Endereco endereco = enderecoRepository.findById(id)
                    .orElseThrow(
                            () -> new RuntimeException("Endereço não encontrado.")
                        );
            endereco.setCep(update.getCep());
            endereco.setNomeDaRua(update.getNomeDaRua());
            endereco.setNumeroDaCasa(update.getNumeroDaCasa());
            
            enderecoRepository.save(endereco);

    }

    public void deleteEndereco(Long id){
        if(id == null)throw new RuntimeException("ID inválido.");
        enderecoRepository.deleteById(id);
    }
}
