package dev.pjatk.recipeapp.repository;

import dev.pjatk.recipeapp.entity.recipe.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderByNameAsc();

    Set<Category> findByNameIn(Collection<String> names);
}