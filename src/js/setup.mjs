// Modules
// You can import script modules and have full type completion
import Greeter from './Greeter/Greeter.mjs';

// Data
// Game data for registration
import ModData from '../data/data.json';

// Styles
// Will automatically load your styles upon loading the mod
import '../css/styles.css';

// Images
// To bundle your mod's icon
import '../img/icon.png';
// Reference images using `ctx.getResourceUrl`
import LargeIcon from '../img/icon_large.png';

/**
 * @param {ModContext} ctx 
 */
export async function setup(ctx) {
	/*await ctx.gameData.addPackage(ModData);*/
	

	/*
	ctx.onInterfaceReady(() => {
		const html = document.createElement('div');
		SwalLocale.fire({
		iconHtml: `<img class="modBoilerplate__logo-img" src="${ctx.getResourceUrl(LargeIcon)}" />`,
		title: 'Mod Boilerplate',
		html
		});
		ui.create(Greeter({ name: 'Melvor' }), html);
	});
	*/

	patch_SpendMasteryMenu_setSkill();
}

function patch_SpendMasteryMenu_setSkill(){
	SpendMasteryMenu.prototype.setSkill = function(skill, game){
		this._currentSkill = skill;

		this.masteryItems.forEach(function(item, index){ if (item !== undefined) item.remove(); });
		this.masteryItems = [];

		let masteriesScrollbox = document.getElementById("masteries-scrollbox");
		if(!masteriesScrollbox){
			masteriesScrollbox = document.createElement("div");
			masteriesScrollbox.id = "masteries-scrollbox";
			masteriesScrollbox.classList = "overflow-y-auto";
			masteriesScrollbox.style.maxHeight = "80vh";
		}

		this.masteryItemContainer.appendChild(masteriesScrollbox);

		if(!document.getElementById('base-game-mastery-group'))
			this.baseGameMasteryGroup = createSpendMasteryMenuItemGroupElement('Base Game', 'base-game-mastery-group');
			masteriesScrollbox.appendChild(this.baseGameMasteryGroup);
		if(!document.getElementById('TOTH-game-mastery-group'))
			this.TOTHGameMasteryGroup = createSpendMasteryMenuItemGroupElement('Throne of the Herald', 'TOTH-game-mastery-group');
			masteriesScrollbox.appendChild(this.TOTHGameMasteryGroup);

        this.itemsByAction.clear();
        skill.sortedMasteryActions.forEach((action,i)=>{
			const namespace = action._namespace.name;
			const parentGroup = ['melvorD', 'melvorF'].includes(namespace) ? this.baseGameMasteryGroup : namespace == 'melvorTotH' ? this.TOTHGameMasteryGroup : this.baseGameMasteryGroup;
			const groupContent = parentGroup.querySelector('.block-content');
			const masteryItem = createElement('spend-mastery-menu-item', {
                className: 'coi-12 col-md-6',
                parent: groupContent
            });

			this.masteryItems[i] = masteryItem;

            this.itemsByAction.set(action, masteryItem);
            masteryItem.setAction(action);
            masteryItem.updateProgress(skill, action, this.levelUpAmount);
            if (game.settings.hideMaxLevelMasteries && skill.getMasteryLevel(action) >= 99)
                hideElement(masteryItem);
            else
                showElement(masteryItem);
        }
        );
        if (skill.masteryToken !== undefined) {
            const tokenItem = skill.masteryToken;
            this.tokenImage.src = tokenItem.media;
            this.updateTokenQuantity(game.bank.getQty(tokenItem));
            this.claimTokenButton.onclick = ()=>{
                game.bank.claimItemOnClick(tokenItem, Infinity);
                this.claimTokenButton.blur();
            }
            ;
        }
        this.poolDisplay.setSkill(skill);
	};
}

function createSpendMasteryMenuItemGroupElement(title, id){
	const base = document.createElement('div');
	base.classList = 'block col-12';
	base.id = id;

	const header = document.createElement('div');
	header.classList = 'block-header';
	const headerTitle = document.createElement('h3');
	headerTitle.classList = 'block-title';
	headerTitle.innerHTML = title;
	header.appendChild(headerTitle);
	base.appendChild(header);

	const content = document.createElement('div');
	content.classList = 'row gutters-tiny block-content';
	base.appendChild(content);

	return base;
}