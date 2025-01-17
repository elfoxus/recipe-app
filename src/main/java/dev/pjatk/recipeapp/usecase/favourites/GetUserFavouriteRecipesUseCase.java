package dev.pjatk.recipeapp.usecase.favourites;

import dev.pjatk.recipeapp.dto.response.RecipeDTO;
import dev.pjatk.recipeapp.entity.User;
import dev.pjatk.recipeapp.repository.UserRepository;
import dev.pjatk.recipeapp.util.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class GetUserFavouriteRecipesUseCase {
    private final UserRepository userRepository;

    public List<RecipeDTO> execute() {
        return SecurityUtils.getCurrentUserLogin()
                .flatMap(userRepository::findOneWithFavouriteRecipesByEmail)
                .map(User::getFavouriteRecipes)
                .orElse(Set.of())
                .stream()
                .map(RecipeDTO::new)
                .toList();
    }
}
