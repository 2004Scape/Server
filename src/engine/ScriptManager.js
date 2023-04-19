import _ from 'lodash';

class ScriptManager {
    library = [];

    register(trigger, on, instance) {
        this.library.push({ trigger, on, instance });
    }

    registerHeldUse(on, instance) {
        this.register('OPHELDU', on, instance);
        this.register('OPHELDU', { useItemId: on.onItemId, onItemId: on.useItemId }, instance);
    }

    get(player, trigger, on = {}, params = {}, type = 'normal') {
        let script = this.library.find(s => s.trigger == trigger && _.isEqual(s.on, on));
        if (!script) {
            // catch-all scripts are useful for debugging but ideally scripts' scopes are limited
            script = this.library.find(s => s.trigger == trigger && _.isEqual(s.on, {}));
        }

        if (script) {
            return new script.instance(player, params, type, trigger);
        } else {
            return null;
        }
    }
}

export default new ScriptManager();
