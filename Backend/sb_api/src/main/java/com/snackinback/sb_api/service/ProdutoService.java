package com.snackinback.sb_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.snackinback.sb_api.model.Produto;
import com.snackinback.sb_api.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public void addProduto(Produto request){
        produtoRepository.save(request);
    }

     public Produto getProdutoById(Long id){
        
        if (id==null) throw new RuntimeException("ID inválido.");
        Produto produto = produtoRepository.findById(id)
         .orElseThrow(
                () -> new RuntimeException("Produto não encontrado")
                );
        return produto;
                
    }

    public List<Produto> listarTodosOsProdutos(){
        return produtoRepository.findAll();
    }

    public void updateProduto(Long id, Produto update){
        if(id == null)throw new RuntimeException("ID inválido.");
        
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Produto não encontrado.")
                    );
        produto.setNome(update.getNome());
        produto.setPreco(update.getPreco());
        produto.setCategoria(update.getCategoria());
        
        produtoRepository.save(produto);

    }

    public void deleteProduto(Long id){
        if(id == null)throw new RuntimeException("ID inválido.");
        produtoRepository.deleteById(id);
    }

}

